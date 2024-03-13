import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react"

export interface IClient_ {
    id: number,
    company_name: string,
    created_at: Date,
    updated_at: Date,
}

interface IClientAPiData {
    id: number,
    company_name: string,
    created_at: string,
    updated_at: string,
}

const deserialize = (client: IClientAPiData): IClient_ => {
    return {
        ...client,
        created_at: new Date(client.created_at),
        updated_at: new Date(client.updated_at),
    }
}

export const useClientList = () => {
    const [clientList, setClientList] = useState<IClient_[]>([]);
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        /** fetch the data here */
        const fetch = async () => {
            const clientList_: IClientAPiData[] = await invoke('list_client');
            setClientList(clientList_.map(deserialize));
        }

        if (typeof window !== 'undefined') {
            fetch();
        }
    }, [refreshCount])

    const refresh = () => {
        setRefreshCount(refreshCount + 1);
    }

    return { clientList, refresh };
}