import React from 'react';

interface TableItemProps {
    children: React.ReactNode;
}

export function TableItem({ children }: TableItemProps) {
    return (
        <tr className="hover:bg-gray-50 transition-colors group">
            {children}
        </tr>
    );
}
