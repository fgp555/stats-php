    // Log current URL
    console.log('Current URL:', window.location.href);

    // Log history URL
    console.log('History URL:', document.referrer);

    // Log IP address and country using the ipapi.co API
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
        console.log('IP Address:', ip);
        const country = data.country_name;
        console.log('Country:', country);

        // Prepare the data to be sent
        const requestData = {
          currentURL: window.location.href,
          historyURL: document.referrer,
          ipAddress: ip,
          country: country
        };

        // Send the data to stats.php
        fetch('receive_stats.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        })
          .then(response => {
            if (response.ok) {
              console.log('Data sent successfully');
            } else {
              console.error('Error sending data:', response.statusText);
            }
          })
          .catch(error => console.error('Error sending data:', error));
      })
      .catch(error => console.error('Error fetching IP address and country:', error));

    // Log click events on the <a> tags
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', event => {
        console.log(`Link clicked: ${link.href}`);
        // Prevent the default behavior of the link
        event.preventDefault();
        // Add your custom logic here for when a link is clicked
      });
    });