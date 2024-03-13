'use client';

import { Breadcrumb } from "flowbite-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AppBreadcrumb() {
    const pathname = usePathname();

    /** breakdown the current path and construct a breadcrumb items here */
    const path = useMemo(() => {
        const [_, ...pathList] = pathname.split('/');

        return [
            { name: 'Home', href: '/', disabled: false },
            ...pathList.filter(item => item !== '')
                .map((item, index) => ({
                    name: item, /** @todo map the value */
                    href: `/${pathList.slice(0, index + 1).join('/')}`,
                    disabled: index === pathList.length - 1
                }))
        ]
    }, [pathname])

    return (
        <Breadcrumb>
            {
                path.map((item, index) => (
                    <Breadcrumb.Item key={index} href={item.disabled ? undefined : item.href}>{item.name}</Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
}