import RegisterForm from "@/components/RegisterForm";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Register() {

  return <RegisterForm />;
}