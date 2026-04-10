import { inngest } from "@/inngest/client";
import { onTicketCreate } from "@/inngest/functions/on-ticket-create";
import { onSignupUser } from "@/inngest/functions/signup-task";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
    client:inngest,
    functions:[
        onSignupUser,
        onTicketCreate
    ]
})