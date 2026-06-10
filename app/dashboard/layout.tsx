// import Sidebar from "@/component/dashboard/sidebar"

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" mt-10">
            {/* <Sidebar /> */}
            {children}
        </div>
    )
}