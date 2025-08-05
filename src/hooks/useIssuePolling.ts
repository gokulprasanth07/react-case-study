import { useEffect, useRef, useState } from 'react';

export function useIssuePolling(fetchIssues: () => void, interval: number = 10000) {
    const [lastSync, setLastSync] = useState<Date | null>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initial fetch
        fetchIssues();
        setLastSync(new Date());
        timer.current = setInterval(() => {
            fetchIssues();
            setLastSync(new Date());
        }, interval);
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [fetchIssues, interval]);

    return { lastSync };
}
