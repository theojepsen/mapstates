# Mapstates
Making unusual maps from the GeoNames database

## Places at states' extremities
For each state, find the two places that are the furthest apart (as the
crow flies. Usage:

    cat US.txt | node ./find_extremities.js

The above outputs the files `extremities.csv` and `extremities.json`.
See the ones we generated in `data/`.
