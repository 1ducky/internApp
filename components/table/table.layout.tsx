import React from 'react';

interface TableLayoutProps {
    headers: string[];
    children: React.ReactNode;
}

export function TableLayout({ headers, children }: TableLayoutProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider ${
                                        header === "Actions" ? "text-right" : "text-left"
                                    }`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
