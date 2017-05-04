# [SQUID Score](https://nk1877.github.io/StreetCondition/#)
*A decision making tool for NYC street maintenance*

This proof-of-concept tool combines:

- 311 "Street complaint data"
- Car Ownership Data from the American Community Survey
- Median Income Data from the American Community Survey
- A simulated score inspired by our [Street Quality Identification Device aka SQUID project](hackster.io/argo/squid-street-quality-identification-device-a43367) to generate a simple  **response metric** for NYC Street maintenance personnel. 

The overall purpose is to better allocate street maintenance resources in a manner that is more reflective of local conditions,  leverages low-cost data collection methods and puts open data to work.

Steps to reproduce creation of dataset that powers the visualization.

 1. [`FindingLocation.ipynb`](https://github.com/vr00n/StreetCondition/blob/master/FindingLocation_Step1.ipynb) - This script extracts 311 "Street Complaint data" from individual SOCRATA views from 2005 - 2015
 2. [`GettingCoordinates.ipynb`](https://github.com/vr00n/StreetCondition/blob/master/GettingCoordinates_Step2.ipynb) - This where the location cleaning is performed.  An extract of the the 311 data from 1) is created where lat and long are not provided.  For rows where a lat/long co-ordinate is not present, all available address components on that row are concatenated and passed to a Google Maps API to estimate a lat/long. This is done to ensure that MOST rows have some mappable data. There are a few cases where no address information is provided. These rows are not considered in the final dataset. This routine requires a Google Maps API key 
 3. [`All Street Data.ipynb`](https://github.com/vr00n/StreetCondition/blob/master/All%20Street%20Data_Step3.ipynb) -  The data which is now "normalized" for location is combined with data from data that already have lat/long co-ordinates to generate a FINAL dataset. This data powers the visualization. A location-normalized 311 dataset dated 18-Oct-2016 is available [here](https://drive.google.com/a/nyu.edu/file/d/0B3YXRPeRJxQFanFtTlA4QlhVaEU/view?usp=sharing)
 4. [`AggregateToCensus.ipynb`](https://github.com/vr00n/StreetCondition/blob/master/AggregateToCensus.ipynb) - This notebook groups all street condition data by census tract level and adds ACS 2014 per capita income and total car number data to create a csv file to be used as an input to the visualization tool.
The code for the viz tool is [here](https://github.com/nk1877/StreetCondition/tree/gh-pages) 
