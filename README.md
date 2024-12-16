# Solar Panel Planner App ☀️
The Solar Panel Planner app is a full-stack web application designed to facilitate Los Angeles residents in scheduling solar panel evaluation visits while enabling city hall employees to manage and optimize these visits efficiently. Residents can submit requests with validated addresses and preferred times, and receive notifications regarding their appointments. The app includes an admin interface for authorized employees to view, plan, and export visit schedules, supported by route optimization and tracking features.

## Features

- **Appointment Scheduling**: Residents can schedule an appointment.
- **Manage Requests**: Residents can securely manage their request, edit details or cancel it, via OTP based access. 
- **User Authentication**: City Hall employees / admins can login via GitHub
- **Route Planner**: Generate an optimised order of visits for any given day based on appointment locations.
- **Dynamic Maps Integration**: View locations using Google Maps on Detail and Planning pages.
- **Email Notifications**: Residents can get notified of their confirmed appointment time via an email notification.
- **PDF Report Generation**: Export appointment schedule with details to PDF with list and map.
- **Responsive Design**: Modern and user-friendly interface.

## Tech Stack

**Frontend**:  
- [Next.js](https://nextjs.org)  
- [React.js](https://reactjs.org)  
- [Tailwind CSS](https://tailwindcss.com)  

**Backend**:  
- [Node.js](https://nodejs.org)  
- [Mongoose](https://mongoosejs.com)  

**Other Tools**:  
- [NextAuth](https://next-auth.js.org) for authentication.
- [Google Maps API](https://developers.google.com/maps) for map visualization.
- [Iron Session](https://github.com/vvo/iron-session) for session handling.
- [@react-pdf/renderer](https://react-pdf.org) for generating reports.
- [Nodemailer](https://nodemailer.com/) for sending emails.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/solar-panel-planner-app.git
   cd solar-panel-planner-app
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=<your-mongodb-uri>
    NEXTAUTH_SECRET=<your-nextauth-secret>
    GITHUB_ID=<your-github-client-id>
    GITHUB_SECRET=<your-github-client-secret>
    GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
    ```
4. **Install dependencies**:
   ```bash
   npm run dev
   ```

## Our Team

- Mahmudul Hasan : [GitHub](https://github.com/mHasan1037) / [LinkedIn](#)
- Ahsas Sharma : [GitHub](https://github.com/ahsas-sharma) / [LinkedIn](https://linkedin.com/in/ahsas-sharma)
