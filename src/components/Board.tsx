import React, { useContext, useMemo, useState } from 'react';
import { IssuesContext } from '../context/IssuesContext';
import { UserContext } from '../context/UserContext';
import { Issue } from '../types';
import { Filter } from './Filter';
import { UndoContext } from '../context/UndoContext';
import { UndoToast } from './UndoToast';
import './Board.css';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';

const COLUMN_STATUSES = ['Backlog', 'In Progress', 'Done'] as const;

type Status = typeof COLUMN_STATUSES[number];

// Priority score calculation
function getPriorityScore(issue: Issue): number {
  const daysSinceCreated = Math.floor((Date.now() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  return issue.severity * 10 + (daysSinceCreated * -1) + issue.userDefinedRank;
}

const DraggableIssueCard = ({ issue, children, className }: { issue: any; children: React.ReactNode; className?: string }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: issue.id,
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={className ? `${className} draggable` : 'draggable'}
      style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}
    >
      <span className="drag-handle">::</span>
      {children}
    </div>
  );
};

const DroppableColumn: React.FC<{ status: Status; children: React.ReactNode }> = ({ status, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  return (
    <div
      ref={setNodeRef}
      style={{ background: isOver ? '#e0e7ff' : undefined }}
    >
      {children}
    </div>
  );
};

export const Board: React.FC = () => {
  const { issues, moveIssue, loading, error } = useContext(IssuesContext);
  const { currentUser } = useContext(UserContext);
  const { undoData, triggerUndo, performUndo } = useContext(UndoContext);
  const [filters, setFilters] = useState<{ assignee: string; severity: number | null; search: string }>({ assignee: '', severity: null, search: '' });
  const [localIssues, setLocalIssues] = useState<Issue[] | null>(null);


  // Use localIssues if present (for undo), else issues from context
  const issuesToUse = localIssues || issues;

  // Filter issues based on selected filters and live search
  const filteredIssues = useMemo(() => {
    return issuesToUse.filter(issue => {
      const assigneeMatch = !filters.assignee || issue.assignee === filters.assignee;
      const severityMatch = filters.severity === null || issue.severity === filters.severity;
      const search = filters.search.trim().toLowerCase();
      const titleMatch = !search || issue.title.toLowerCase().includes(search);
      const tagsMatch = !search || (issue.tags && issue.tags.some(tag => tag.toLowerCase().includes(search)));
      return assigneeMatch && severityMatch && (titleMatch || tagsMatch);
    });
  }, [issuesToUse, filters]);

  // Group and sort filtered issues by status and priority
  const columns = useMemo(() => {
    const grouped: Record<Status, Issue[]> = {
      Backlog: [],
      'In Progress': [],
      Done: [],
    };
    filteredIssues.forEach(issue => {
      if (grouped[issue.status as Status]) {
        grouped[issue.status as Status].push(issue);
      }
    });
    COLUMN_STATUSES.forEach(status => {
      grouped[status].sort((a, b) => {
        const scoreDiff = getPriorityScore(b) - getPriorityScore(a);
        if (scoreDiff !== 0) return scoreDiff;
        // If scores match, newer issues first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    });
    return grouped;
  }, [filteredIssues]);

  if (loading) return <div>Loading issues...</div>;
  if (error) return <div>Error loading issues: {error}</div>;

  // Handle move with undo support
  const handleMove = (id: string, newStatus: Status) => {
    // Save previous state for undo
    const prevIssues = issuesToUse.map(issue => ({ ...issue }));
    setLocalIssues(
      issuesToUse.map(issue =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
    triggerUndo(prevIssues, 'Issue moved. Undo?');
    // After 500ms, commit the move (simulate async save)
    setTimeout(() => {
      moveIssue(id, newStatus);
      setLocalIssues(null);
    }, 500);
  };

  // Handle undo action
  const handleUndo = () => {
    if (undoData) {
      setLocalIssues(undoData.prevIssues);
      performUndo();
      // Do not clear localIssues after a delay; keep the undoed state until next move
    }
  };

  const handleDragEnd = (event: import('@dnd-kit/core').DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const issue = issuesToUse.find(i => i.id === active.id);
      if (issue && issue.status !== over.id) {
        handleMove(issue.id, over.id as Status);
      }
    }
  };

  return (
    <div className="board-container">
      <UndoToast onUndo={handleUndo} />
      <Filter onFilter={setFilters} />
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="board-columns">
          {COLUMN_STATUSES.map(status => (
            <div key={status} className="board-column">
              <h2>{status}</h2>
              {columns[status].length === 0 && (
                <div className="no-issues">No issues</div>
              )}
              <DroppableColumn status={status}>
                {columns[status].map(issue => (
                  <DraggableIssueCard
                    key={issue.id}
                    issue={issue}
                    className={`issue-card${status === 'In Progress' ? ' in-progress' : status === 'Done' ? ' done' : ''}`.trim()}
                  >
                    <div>
                      <div className="issue-title">{issue.title}</div>
                      <div className="issue-desc">{issue.description}</div>
                      <div className="issue-meta">
                        <b>Assignee:</b> {issue.assignee} &nbsp;|&nbsp; <b>Severity:</b> {issue.severity}
                      </div>
                      <div className="issue-meta">
                        <b>Tags:</b> {issue.tags && issue.tags.length > 0 ? issue.tags.join(', ') : 'None'}
                      </div>
                      <div className="issue-meta">
                        <b>Priority Score:</b> {getPriorityScore(issue)}
                      </div>
                      {currentUser.role === 'admin' && status !== 'Done' && (
                        <button
                          onClick={() => handleMove(issue.id, getNextStatus(status))}
                          className="move-btn"
                        >
                          Move to {getNextStatus(status)}
                        </button>
                      )}
                    </div>
                  </DraggableIssueCard>
                ))}
              </DroppableColumn>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

function getNextStatus(status: Status): Status {
  if (status === 'Backlog') return 'In Progress';
  if (status === 'In Progress') return 'Done';
  return 'Done';
}
