interface TableDataProps {
    children: React.ReactNode;
}

export function TableData({ children }: TableDataProps) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            {children}
        </td>
    );
}
