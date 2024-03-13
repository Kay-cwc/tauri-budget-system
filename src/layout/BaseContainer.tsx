import { Sidebar } from "flowbite-react";
import { ReactNode } from "react";

export default function BaseContainer({
    children
}: {
    children: ReactNode,
}) {
    return (
        <div className="flex bg-gray-300 p-2">
            <Sidebar className="bg-gray-100">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {/* <Sidebar.Item href='projects' >Projects</Sidebar.Item> */}
                        <Sidebar.Item href='clients'>Client</Sidebar.Item>
                        {/* <Sidebar.Item>Invoices</Sidebar.Item> */}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-300">
                {children}
            </main>
        </div>
    )
}