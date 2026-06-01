'use client'

import { useState } from "react";
import {
    User,
    LayoutGrid,
    Settings,
    FileText,
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from "lucide-react";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { icon: <User size={20} />, label: 'profile' },
        { icon: <LayoutGrid size={20} />, label: 'application' },
        { icon: <Settings size={20} />, label: 'setting' },
        { icon: <FileText size={20} />, label: 'post' },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMobileSidebar}
                className="fixed top-6 left-6 z-50 p-3 bg-white rounded-2xl shadow-lg border border-gray-100 md:hidden text-gray-600 hover:text-black transition-all active:scale-95"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay/Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div className={`
                fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 flex h-screen p-4
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <aside
                    className={`bg-white rounded-3xl shadow-sm transition-all duration-300 flex flex-col items-center py-6 relative h-full ${isOpen ? 'w-64 px-6' : 'w-20 px-2'
                        }`}
                >
                    {/* Desktop Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="hidden md:flex absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 shadow-md text-gray-400 hover:text-black transition-colors z-10"
                    >
                        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {/* Logo Section */}
                    <div className={`flex items-center w-full mb-10 ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                            {/* Mock Logo Gradient */}
                            <div className="w-6 h-6 bg-gradient-to-tr from-blue-400 via-purple-500 to-indigo-600 rounded-full blur-[2px]" />
                        </div>
                        {isOpen && <span className="font-bold text-xl text-gray-800 tracking-tight">menu</span>}
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col w-full gap-2 overflow-y-auto no-scrollbar">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 text-gray-500 hover:text-black ${isOpen ? 'justify-start gap-4 px-4' : 'justify-center'
                                    }`}
                            >
                                <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                                    {item.icon}
                                </div>
                                {isOpen && (
                                    <span className="text-sm font-medium whitespace-nowrap">
                                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Optional: User Profile Bottom Section (Aesthetics) */}
                    <div className={`mt-auto w-full pt-6 border-t border-gray-50 flex items-center ${isOpen ? 'justify-start gap-3' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex-shrink-0 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400" />
                        </div>
                        {isOpen && (
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold text-gray-800 truncate">John Doe</span>
                                <span className="text-xs text-gray-400 truncate">Admin</span>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </>
    );
};

