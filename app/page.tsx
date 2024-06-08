'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter()
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<div><Button>hello</Button></div>
<Button type="button" onClick={() => router.push('/login')}>
     login with your Guni Email id
    </Button>
    </main>

  );
}
