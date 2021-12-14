import React, { useMemo, useRef, ReactNode, ChangeEvent } from 'react'
import { FieldArray } from 'react-final-form-arrays'
import stylesBlock from 'utils/stylesBlock'
import IconButton from '@material-ui/core/IconButton'
import Text from 'components/Text'
import UploadButton from './components/UploadButton'
import { ReactComponent as RemoveCross } from '../../icons/remove-cross.svg'
import { MAX_PHOTOS } from '../../consts'
import styles from './Photos.module.scss'

interface IProps {
  name: string;
  readOnly?: boolean;
  label: string;
  hasReview: boolean;
}

const b = stylesBlock(styles)

const Photos: React.FC<IProps> = ({ name, readOnly, label, hasReview }) => {
  const fileInput = useRef<HTMLInputElement>(null)

  const addPhotos = (): void => {
    if (fileInput && fileInput.current) {
      fileInput.current.click()
    }
  }

  return (
    <FieldArray name={name}>
      {({ fields }): ReactNode => {
        const fieldsLength = useMemo(() => {
          if (!fields.length) { return 0 }
          return fields.length
        }, [fields])
        
        const loadFiles = ({ target }: ChangeEvent<HTMLInputElement>): void => {
          const maxAdd = MAX_PHOTOS - fieldsLength
          Array.prototype.slice.call(target.files, 0, maxAdd).forEach((file) => (
            fields.push({ image: file })
          ))
        }

        if (fieldsLength === 0 && hasReview) { return null }

        return (
          <div className={b('wrapper')}>
            <Text className={b('header')}>{ label }</Text>
            <div className={b('list')}>
              {
                fields.map((_name, index): ReactNode => (
                  <div key={index.toString()} className={b('photo-wrapper')}>
                    <img
                      className={b('photo')}
                      src={
                        fields.value[index].id
                          ? fields.value[index].image.thumbUrl
                          : URL.createObjectURL(fields.value[index].image)
                      }
                      alt=''
                    />
                    { !hasReview &&
                      <IconButton
                        className={b('remove-button')}
                        onClick={(): void => fields.remove(index)}
                      >
                        <RemoveCross />
                      </IconButton>
                    }
                  </div>
                ))
              }
              { !readOnly && fieldsLength < MAX_PHOTOS && <UploadButton onClick={addPhotos} /> }
            </div>
            <input
              type='file'
              multiple
              accept='image/*'
              ref={fileInput}
              onChange={loadFiles}
              style={{ display: 'none' }}
            />
          </div>
        )
      }}
    </FieldArray>
  )
}

export default Photos
