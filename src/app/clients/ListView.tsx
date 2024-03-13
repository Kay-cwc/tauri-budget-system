'use client'

import { IClient_ } from "@/hooks/useClient";
import { Button, Table } from "flowbite-react";
import { useRouter } from "next/navigation";

function ListViewBody({ data }: { data: IClient_[] }) {
    const router = useRouter();

    const goToDetails = (clientId: number) => {
        router.push(`/clients/details?clientId=${clientId}`);
    }   

    return (
        <Table.Body>
            {
                data.map((client) => (
                    <Table.Row key={`client::list-view::${client.id}`}>
                        <Table.Cell>{client.id}</Table.Cell>
                        <Table.Cell>{client.company_name}</Table.Cell>
                        <Table.Cell>{client.created_at.toISOString()}</Table.Cell>
                        <Table.Cell>{client.updated_at.toISOString()}</Table.Cell>
                        <Table.Cell>
                            <Button onClick={() => goToDetails(client.id)}>details</Button>
                        </Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    )
}

export default function ClientListView({ data }: { data: IClient_[] }) {
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Company name</Table.HeadCell>
                <Table.HeadCell>Created at</Table.HeadCell>
                <Table.HeadCell>Updated at</Table.HeadCell>
            </Table.Head>
            <ListViewBody data={data} />
        </Table>
    )
}