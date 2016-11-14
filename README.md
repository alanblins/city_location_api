# city_location_api
API server made by nodejs+express to get city name by location using local shapefiles.
The shapefile can get on this [link](ftp://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2015/): 
Just move the shapefiles into folder malhas_municipais/[state]/

## Requisites
* NODEJS
* NPM

## How to use
```cmd
npm install
node server.js
```

## Calling api

### Request all information(geojson format)
API
```cmd
city?longitude=longitue&latitude=latitude
```
CURL
```cmd
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 99bc454e-b65f-96a3-b466-3428548679b6" "http://localhost:8089/api/city?longitude=-48.476174&latitude=-1.379504"
```
### Response:
```json
{
  "type": "Feature",
  "properties": {
    "NM_MUNICIP": "BELÉM",
    "CD_GEOCMU": "1501402"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [Object object]
  }
}
```

### Request properties(geojson format)
API
```cmd
city/properties?longitude=longitue&latitude=latitude
```
CURL
```cmd
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 9ffef53c-33fa-c326-bb88-5d338394de27" "http://localhost:8089/api/city/properties?longitude=-48.476174&latitude=-1.379504"
```
### Response:
```json
{
  "NM_MUNICIP": "BELÉM",
  "CD_GEOCMU": "1501402"
}
```
### Request geometry(geojson format)
API
```cmd
city/geometry?longitude=longitue&latitude=latitude
```
CURL
```cmd
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 9ffef53c-33fa-c326-bb88-5d338394de27" "http://localhost:8089/api/city/geometry?longitude=-48.476174&latitude=-1.379504"
```
### Response:
```json
{
  "type": "Polygon",
  "coordinates": [Object object]
}
```
### Request feature(geojson format)
API
```cmd
city/feature?longitude=longitue&latitude=latitude
```
CURL
```cmd
curl -X GET -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 9ffef53c-33fa-c326-bb88-5d338394de27" "http://localhost:8089/api/city/feature?longitude=-48.476174&latitude=-1.379504"
```
### Response:
```json
{
  "type": "Feature",
  "properties": {
    "NM_MUNICIP": "BELÉM",
    "CD_GEOCMU": "1501402"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [Object object]
  }
}
```
