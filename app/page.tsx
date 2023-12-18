import getCurrentUser from '@/actions/getCurrentUser'
import ClientOnly from '@/components/ClientOnly';
import IntialModel from '@/components/models/IntialModel';
import { useModal } from '@/hooks/useModel.store';
import { User } from '@prisma/client';
import Image from 'next/image'
import { redirect } from 'next/navigation';

export default async function Home() {
  const currentUser: User | null = await getCurrentUser();

  if (!currentUser) {
    console.log(currentUser)
    return (<ClientOnly><IntialModel /></ClientOnly>)
  }

  return (
<div>
  hi
</div>
  )
}
