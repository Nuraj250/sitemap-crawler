document.getElementById('crawlButton').addEventListener('click', function() {
    console.log('Crawl button clicked.');

    // Show the loader modal
    console.log('Displaying the loader modal...');
    $('#loaderModal').modal('show');

    var startUrl = document.getElementById('startUrl').value;
    console.log('Preparing to fetch results for URL:', startUrl);

    fetch('/crawl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startUrl: startUrl }),
    })
    .then(response => {
        console.log('Received response from the server.');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received from the server:', data);

        // Validate the received data
        if (!data.urls || !Array.isArray(data.urls) || !data.failedcrawledurls || !Array.isArray(data.failedcrawledurls)) {
            throw new Error('Data is not in the expected format:', JSON.stringify(data));
        }
        console.log('Valid data format confirmed.');

        // Hide the loader modal
        console.log('Hiding the loader modal...');
        $('#loaderModal').modal('hide');

        // Display the successful URLs
        console.log('Displaying successful URLs...');
        var resultsSection = document.getElementById('resultsSection');
        var resultsText = document.getElementById('resultsText');
        var resultsList = document.getElementById('resultsList');

        resultsText.textContent = 'Crawling complete! Found ' + data.urls.length + ' successful URLs.';
        resultsList.innerHTML = ''; // Clear any previous results

        data.urls.forEach(function(url) {
            var listItem = document.createElement('li');
            listItem.textContent = url;
            resultsList.appendChild(listItem);
        });
        resultsSection.style.display = 'block';

        // Display the failed URLs
        console.log('Displaying failed URLs...');
        var resultsFailedSection = document.getElementById('resultsfailedSection');
        var resultsFailedText = document.getElementById('resultsfailedText');
        var resultsFailedList = document.getElementById('resultsfailedList');

        resultsFailedText.textContent = 'Found ' + data.failedcrawledurls.length + ' failed URLs.';
        resultsFailedList.innerHTML = ''; // Clear any previous results

        data.failedcrawledurls.forEach(function(url) {
            var listItem = document.createElement('li');
            listItem.textContent = url;
            resultsFailedList.appendChild(listItem);
        });
        resultsFailedSection.style.display = 'block';

        console.log('Results are now displayed on the page.');
    })
    .catch(error => {
        console.error('An error occurred during the fetch operation:', error);
        $('#loaderModal').modal('hide');
    });

    // Download buttons functionality
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    document.getElementById('downloadSuccessBtn').addEventListener('click', function() {
        var urls = [...document.querySelectorAll('#resultsList li')].map(li => li.textContent).join('\n');
        download("successful-urls.txt", urls);
        console.log('Downloading successful URLs...');
    });

    document.getElementById('downloadFailedBtn').addEventListener('click', function() {
        var urls = [...document.querySelectorAll('#resultsfailedList li')].map(li => li.textContent).join('\n');
        download("failed-urls.txt", urls);
        console.log('Downloading failed URLs...');
    });
});
