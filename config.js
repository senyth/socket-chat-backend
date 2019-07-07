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
    }
  };
  
  module.exports = config;
  