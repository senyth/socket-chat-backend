/**
 * Name:          Configuration
 * Description:   Contains the configuration of the ports and database
 * Developer:     Babie Entoma
 * Date:          06/29/2019
 */
const config = {
    app: {
      port: 3000
    },
    db: {
      host: 'localhost', 
      port: 27017,
      name: 'chat-app'
    },
    secret: 'G-@angleGmsSystem_123456789',
    // app_url: 'http://18.182.27.53:3000' // Omotenashi AWS development server
    app_url: 'https://omotenashi.gm-system.net' // Omotenashi Production server
  };
  
  module.exports = config;
  