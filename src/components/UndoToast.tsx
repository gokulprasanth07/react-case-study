import React, { useContext } from 'react';
import { UndoContext } from '../context/UndoContext';

export const UndoToast: React.FC<{ onUndo: () => void }> = ({ onUndo }) => {
  const { undoData } = useContext(UndoContext);
  if (!undoData) return null;
  return (
    <div className="undo-toast">
      <span>{undoData.message}</span>
      <button onClick={onUndo}>Undo</button>
    </div>
  );
};
