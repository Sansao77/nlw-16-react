import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';

export function CreateTripPage() {
  const navigate = useNavigate();
  
  const [isGuestsInputOpen, SetIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, SetIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, SetISConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, SetEmailsToInvite] = useState([
    'jessica.white44@yahoo.com', 'erik_leffler3@gmail.com',
    'rebekah.conn21@gmail.com', 'emile.mayer25@yahoo.com'
  ])
  
  function openGuestsInput(){
    SetIsGuestsInputOpen(true);
  }

  function closeGuestsInput(){
    SetIsGuestsInputOpen(false);
  }

  function openGuestsModal(){
    SetIsGuestsModalOpen(true);
  }

  function closeGuestsModal(){
    SetIsGuestsModalOpen(false);
  }

  function openConfirmTripModal(){
    SetISConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal(){
    SetISConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event:FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    //Se o usuário não preencheu nada no e-mail, nada acontece
    if(!email) return;

    //Impedi a adição de um e-mail já existente na lista
    if(emailsToInvite.includes(email)) return;

    SetEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove:string){
    const newEmailList = emailsToInvite.filter(invited => invited != emailToRemove);

    SetEmailsToInvite(newEmailList);
  }

  function createTrip(event:FormEvent<HTMLFormElement>){
    event.preventDefault();

    navigate("/trips/123");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full  px-6 text-center space-y-10">
        <div className=' flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className='space-y-4'>
          
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep 
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>
        

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="/" className="text-zinc-300 underline">termos de uso</a> e <a href="/" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && 
      <InviteGuestsModal 
        emailsToInvite={emailsToInvite}
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestsModal={closeGuestsModal}
        removeEmailFromInvites={removeEmailFromInvites}
      />
      }

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  )
}
