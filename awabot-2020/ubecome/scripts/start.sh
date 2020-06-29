#!/bin/bash
appname=basename $0 | sed s,\.sh$,,
dirname=dirname $0
tmp="${dirname#?}"
if [ "${dirname%$tmp}" != "/" ]; then
dirname=$PWD/$dirname
fi
cd $dirname/../backend
npm start &
cd $dirname/../frontend
npm start &
cd