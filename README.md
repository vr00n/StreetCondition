# [SQUID Score](https://nk1877.github.io/StreetCondition/#)
*A decision making tool for NYC street maintenance
Combines 311 "Street complaint data" + ACS Car Ownership Data + ACS Median Income Data + a Hypothesized score from <a href="https://youtu.be/QzMCTIdxpoc" target="_blank">Street Quality Identification Device aka SQUID</a> to generate a* **response metric** *for NYC Street maintenance personnel to allocate resources in a manner that is more reflective of local conditions and leverages low-cost data collection methods*


Steps to reproduce creation of dataset that powers the visualzation.

##1- FindingLocation.ipynb
This script extracts 311 "Street Complaint data" from individual SOCRATA views from 2005 - 2015

##2 - GettingCoordinates.ipynb
This where the location cleaning is performed. 
An extract of the the 311 data from 1) is created where lat and long are not provided. 

For rows where a lat/long co-ordinate is not present, all avaiable address components on that row are concatenated and passed to a Google Maps API to estimate a lat/long. This is done to ensure that MOST rows have some mappable data. There are a few cases where no address information is provided. These rows are not considered in the final dataset

This routine requires a Google Maps API key

##3-All Street Data.ipynb

The data which is now "normalized" for location is combined with data from 1) which already have lat/long co-oridnates to generate a FINAL dataset. This data powers the visualization

A location-normalized 311 dataset dated 18-Oct-2016 is available here:
https://drive.google.com/a/nyu.edu/file/d/0B3YXRPeRJxQFanFtTlA4QlhVaEU/view?usp=sharing


###4 - AggregateToCensus.ipynb

This notebook groupsby all street condition data to census tract level and adds ACS 2014 per cpita income and total car number data to create a csv file to be used as an input to the visualization tool.

Location to code for vizualization tool.
https://github.com/nk1877/StreetCondition/tree/gh-pages 
