find build/static/js -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;
find build/static/css -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;
find build/service-worker.js -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;
