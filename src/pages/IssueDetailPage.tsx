import React from 'react';
import {useParams} from 'react-router-dom';

export const IssueDetailPage = () => {
    const {id} = useParams();
    return <div style={{padding: '1rem'}}>TODO: Implement detail view for issue #{id}</div>;
};
