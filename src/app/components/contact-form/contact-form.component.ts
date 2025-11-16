import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  
  onSubmitConsultation(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    console.log('Consultation request:', { name, email, phone });
    // Here you would typically send the data to your backend
    alert('Thank you for your consultation request! We will contact you soon.');
    
    // Reset form
    (event.target as HTMLFormElement).reset();
  }
}
