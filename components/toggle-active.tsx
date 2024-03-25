import React from 'react'
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ToggleActive({isAdmin}: {isAdmin: boolean}) {

    return isAdmin && (
        <div className="flex items-center gap-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Set active</Label>
        </div>
    )
}
