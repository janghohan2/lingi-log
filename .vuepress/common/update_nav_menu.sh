#!/bin/bash

BASE_DIR="../../"
CONFIG_FILE_DIR=${BASE_DIR}".vuepress/"
CONFIG_FILE=${CONFIG_FILE_DIR}"config.js"
TMP_CONFIG_FILE=${BASE_DIR}".vuepress/common/config/tmp_config.js"
IGNORE_DIR="public"

# copy backup file to actual file
cp ${TMP_CONFIG_FILE} ${CONFIG_FILE}

FOLDERS=`ls -l ${BASE_DIR} | grep ^d | awk '{print $9}'`
for folder in ${FOLDERS}; do
    if [ "${folder}" != "${IGNORE_DIR}" ];then
        TARGET_DIR=${BASE_DIR}${folder}"/"
        FILE_NAMES=`ls -l ${TARGET_DIR} | grep ^- | awk '{print $9}'`

        for FILE_NAME_WITH_EXT in ${FILE_NAMES}; do
            # split FILE_NAME_WITH_EXT and get FILE_NAME and EXT
            OIFS=$IFS;IFS=.;FILE_NAME_WITH_EXT_SPLIT=($FILE_NAME_WITH_EXT);IFS=$OIFS
            FILE_NAME=${FILE_NAME_WITH_EXT_SPLIT[0]}
            EXT=${FILE_NAME_WITH_EXT_SPLIT[1]}

            if [ "${FILE_NAME}" != "index" ];then
                # split FILE_NAME and get SUB_MENU
                OIFS=$IFS;IFS=-;FILE_NM_SPLIT=(${FILE_NAME});IFS=$OIFS
                SUB_MENU=${FILE_NM_SPLIT[0]}

                # find _${SUB_MENU| and insert behind
                if [[ ${OSTYPE} == "darwin"* ]];then
                    sed -i ".bak" "/_${SUB_MENU}/i\\
                    \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ '${FILE_NAME}',
                    " ${CONFIG_FILE}
                elif [[ "$OSTYPE" == "linux-gnu" ]];then
                    sed -i ".bak" "/_${SUB_MENU}/i\\\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ '${FILE_NAME}', " ${CONFIG_FILE}
                fi
            fi
        done
    fi
done

# mv config.js ../config.js