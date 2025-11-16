import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DRConstruction';
  
  onSubmitConsultation(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    console.log('Consultation request:', { name, email, phone });
    // Here you would typically send the data to your backend
    alert('Thank you for your consultation request! We will contact you soon.');
  }
}
