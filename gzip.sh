find build/static -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;
