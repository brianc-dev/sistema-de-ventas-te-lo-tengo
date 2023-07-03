import { Grid, Stack } from "@mui/material";

export default function IndexLayout({auth, navbar, content, sidebar, footer}) {
    sidebar ??= <div className="bg-sky-500">sidebar</div>
    return (
        <Stack direction={"column"}>
            {navbar}
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-1">
                <div className="col-span-12 md:col-span-1 lg:col-span-2">
                    {sidebar}
                </div>
                <div className="col-span-12 md:col-span-3 lg:col-span-6">
                    {content}
                </div>
            </div>
            {footer}
        </Stack>
    )
}