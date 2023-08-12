import React, { useState } from 'react';

const SettingDrawer: React.FC = () => {

    const [ settings, setSetting ] = useState({});
    

    return (
        <SettingDrawer
            enableDarkTheme
            getContainer={(e: any) => {
            if (typeof window === 'undefined') return e;
            return document.getElementById('test-pro-layout');
            }}
            settings={settings}
            onSettingChange={(changeSetting) => {
                setSetting(changeSetting);
            }}
            disableUrlParams={false}
        />
    )
}

export default SettingDrawer