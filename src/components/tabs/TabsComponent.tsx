import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { JSX } from 'react';

export interface TabTriggerProps<TValue> {
    value: TValue;
    style: string;
    name: string;
}

export interface TabContentProps<TValue> {
    value: TValue;
    style: string;
    element: JSX.Element;
}

interface TabsComponentProps<TValue> {
    tabListStyle: string;
    tabTriggers: TabTriggerProps<TValue>[];
    tabContents?: TabContentProps<TValue>[];
    onValueChange: (value: TValue) => void;
    activeTab: string;
}

export default function TabsComponent<TValue extends string>({ tabListStyle, tabTriggers, tabContents, onValueChange, activeTab }: TabsComponentProps<TValue>) {
    

    return (

        <Tabs
            value={activeTab}
            onValueChange={(value) => onValueChange(value as TValue)}
        >
            <TabsList className={tabListStyle}>
                {
                    tabTriggers.length > 0 && tabTriggers.map((tabTrigger) => {
                        return (
                            <TabsTrigger
                                value={tabTrigger.value}
                                className={tabTrigger.style}
                            >
                                {tabTrigger.name}
                            </TabsTrigger>
                        )
                    })
                }
            </TabsList>

            {
                tabContents && tabContents.length > 0 && tabContents.map((content) => (
                    <TabsContent value={content.value} className={content.style} >
                        {content.element}
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}
