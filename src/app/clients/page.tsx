'use client';

import AppBreadcrumb from "@/components/AppBreadcrumb";
import { useClientList } from "@/hooks/useClient";
import BaseContainer from "@/layout/BaseContainer";
import ClientListView from "./ListView";
import { Button, TextInput } from "flowbite-react";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

export default function Client() {
    const { clientList, refresh } = useClientList();
    const [newCompanyName, setNewCompanyName] = useState('');

    const handleCreate = async () => {
        const results: boolean = await invoke('create_client', { companyName: newCompanyName });
        if (results) {
            refresh();
            setNewCompanyName('');
        }
    }

    return (
        <BaseContainer>
            <div>
                <AppBreadcrumb />
                <div className="mt-4">
                    <div className="my-2 flex gap-4">
                        <TextInput 
                            value={newCompanyName}
                            onChange={e => setNewCompanyName(e.target.value)}
                            placeholder="New Company Name"
                        />
                        <Button  
                            disabled={newCompanyName === ''}
                            onClick={handleCreate}
                        >
                            Create
                        </Button>
                    </div>
                    <ClientListView data={clientList} />
                </div>
            </div>            
        </BaseContainer>
    )
}
