'use client';

import { useTranslations, } from 'next-intl';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import styles from './SingleFileUpload.module.scss';
import UploadIcon from '@modules/general/components/icons/upload';
import InputBase, { InputBaseProps, } from '@mui/material/InputBase';
import { FileInputAcceptType, } from '@modules/general/libraries/general-types';
import FileUploadPreview from '@/modules/general/components/drag-drop-file-upload/file-upload-preview';
import React, {
  ChangeEvent, useRef, useState,
} from 'react';

export default function SingleFileUpload({
  onChange,
  acceptTypes,
  limitSize,
  className = '',
  error,
  errorText,
}: {
  onChange: any;
  acceptTypes?: FileInputAcceptType[];
  limitSize?: number;
  className?: string;
  error?: boolean;
  errorText?: string;
}) {
  const
    t = useTranslations(),
    inputRef = useRef<InputBaseProps>(null),
    [value, setValue, ] = useState<File | null>(),
    [errorMessage, setErrorMessage,] = useState<string | null>(null),

    isValidSize = (selectedFile: File) => {
      if (limitSize) {
        const MAX_FILE_SIZE = limitSize * 1024;
        const fileSizeKiloBytes = selectedFile.size / 1024;
        return fileSizeKiloBytes < MAX_FILE_SIZE;
      }
      return true;
    },

    isValidType = (selectedFile: File) => {
      if (acceptTypes) {
        return (!!acceptTypes.find((item) => item === selectedFile.type));
      }
      return true;
    },

    handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length == 1) {
        const file = event.target.files[0];

        //Check file size
        if (!isValidSize(file)) {
          setErrorMessage(t('common.form_file_size_error', { size: limitSize, }));
          return;
        } else {
          setErrorMessage('');
        }

        //Check file type
        if ( !isValidType(file)) {
          if (acceptTypes) {
            const types: string[] = acceptTypes.map((item) => {
              return item.split('/')[1] ;
            });
            setErrorMessage(t('common.form_file_type_error', { format: types.join(', '), }));
          }
          return;
        } else {
          setErrorMessage('');
        }

        setValue(file);
        onChange(file);
      }
    },

    handleRemoveFile = () => {
      setValue(null);
      onChange(null);
      setErrorMessage('');
      if (inputRef && inputRef.current && inputRef.current.value) {
        inputRef.current.value = '';
      }
    };

  return (
    <>
      <div className={`${styles.root} ${className}`}>
        <FormControl classes={{ root: `${styles.root__input} ${(errorMessage || error) ? styles.root__input__error : ''}`, }}>
          {(value && !errorMessage) ? (
            <FileUploadPreview
              fileName={value.name}
              mimeType={value.type}
              fileSrc={URL.createObjectURL(value)}
              onDelete={handleRemoveFile}
            />
          ) : (
            <div className={styles.root__input__container}>
              <UploadIcon />
              <div className={styles.root__input__container__text}>
                <Typography
                  color={'GrayText'}
                  variant={'body2'}
                >
                  {t('common.form_file_upload_part_1')}
                </Typography>
                <Typography
                  color={'primary'}
                  variant={'body2'}
                >
                  {t('common.form_file_upload_part_2')}
                </Typography>
              </div>
            </div>
          )}
          <InputBase
            type='file'
            name='uploadFiles'
            onChange={handleFileChange}
            className={styles.root__input__input}
            inputProps={{ accept: `${acceptTypes?.join(', ')}`, }}
            inputRef={inputRef}
          />
        </FormControl>
        {(errorMessage || !!errorText) && (
          <Typography
            color={'error'}
            variant={'tiny'}
          >
            {errorMessage || errorText}
          </Typography>
        )}
      </div>
    </>
  );
}
