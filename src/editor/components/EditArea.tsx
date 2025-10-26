import React, { MouseEventHandler, useEffect, useState } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { Component, useComponetsStore } from "../stores/components"

export function EditArea() {
    const { components, addComponent } = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();
    const [hoverComponentId, setHoverComponentId] = useState<number>();
    const handleMouseOver: MouseEventHandler = (e)  => {
    const path = e.nativeEvent.composedPath();
        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return;
            }
        }
    }
    // useEffect(()=> {
    //     addComponent({
    //         id: 222,
    //         name: 'Container',
    //         props: {},
    //         children: []
    //     }, 1);

    //     addComponent({
    //         id: 333,
    //         name: 'Button',
    //         props: {
    //             text: '无敌'
    //         },
    //         children: []
    //     }, 222);
    // }, []);

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.component) {
                return null;
            }
            
            return React.createElement(
                config.component,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }

    return <div className="h-[100%]" onMouseOver={handleMouseOver}>
        {/* <pre>
            {JSON.stringify(components, null, 2)}
        </pre> */}
        {hoverComponentId}
        {renderComponents(components)}
    </div>
}