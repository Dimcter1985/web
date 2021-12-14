#!/bin/sh
VERSION=$1
VERSION_FILENAME=.git-version-customer

trap "rm -f ${VERSION_FILENAME}" EXIT INT
echo "$(git rev-parse --abbrev-ref HEAD) $(git rev-parse --short HEAD)" >> $VERSION_FILENAME

yarn build &&
docker build -t snailz-web-next:v${VERSION} . &&
docker tag snailz-web-next:v${VERSION} registry.lunatic.cat/snailz-new/web:v${VERSION} &&
docker push registry.lunatic.cat/snailz-new/web:v${VERSION}
