import {type Ref, useCallback, useEffect, useImperativeHandle} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import type {AddProjectWarningQueryArgs} from '@/modules/construction-work-editor/types'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useOpenImagePicker} from '@/hooks/useOpenImagePicker'
import {
  selectCurrentProjectId,
  selectMainImageDescription,
  selectMessage,
  setMainImage,
  setMainImageDescription,
  setMessage,
} from '@/modules/construction-work-editor/messageDraftSlice'

const maxCharacters = {
  title: 100,
  body: 1000,
}

type FormData = {
  body: string
  title: string
}

type Props = {
  onMainImageSelected: () => void
  ref?: Ref<unknown>
}

export const MessageForm = ({ref, onMainImageSelected}: Props) => {
  const dispatch = useDispatch()

  const currentProjectId = useSelector(selectCurrentProjectId)
  const selectedMessage = useSelector(selectMessage(currentProjectId))
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )

  const form = useForm<FormData>()
  const {handleSubmit, setValue} = form

  useEffect(() => {
    setValue('title', selectedMessage?.title ?? '')
    setValue('body', selectedMessage?.body ?? '')
  }, [selectedMessage, setValue])

  const saveMessage = useCallback(
    (data: FormData) => {
      if (currentProjectId) {
        const message: AddProjectWarningQueryArgs = {
          title: data.title,
          body: data.body,
          projectId: currentProjectId,
          send_push_notification: false,
        }

        dispatch(setMessage({projectId: currentProjectId, message}))
      }
    },
    [dispatch, currentProjectId],
  )

  const openImagePicker = useOpenImagePicker()

  const pickImage = useCallback(
    (viaCamera = false) =>
      (data: FormData) => {
        void openImagePicker(viaCamera).then(mainImage => {
          if (!mainImage) {
            return
          }

          dispatch(setMainImage({projectId: currentProjectId, mainImage}))
          !mainImageDescription &&
            dispatch(
              setMainImageDescription({
                projectId: currentProjectId,
                mainImageDescription: undefined,
              }),
            )
          onMainImageSelected()
        })

        saveMessage(data)
      },
    [
      currentProjectId,
      dispatch,
      mainImageDescription,
      onMainImageSelected,
      openImagePicker,
      saveMessage,
    ],
  )

  const onSubmitForm: SubmitHandler<FormData> = useCallback(
    data => {
      saveMessage(data)
      !mainImageDescription &&
        dispatch(
          setMainImageDescription({
            projectId: currentProjectId,
            mainImageDescription: undefined,
          }),
        )
    },
    [dispatch, mainImageDescription, currentProjectId, saveMessage],
  )

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: (onSuccess: () => void) =>
        handleSubmit((...args) => {
          onSubmitForm(...args)
          onSuccess()
        })(),
    }),
    [handleSubmit, onSubmitForm],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="md">
          <TextInputField
            autoFocus
            label="Wat is de titel van je bericht?"
            maxCharacters={maxCharacters.title}
            name="title"
            numberOfLines={3}
            placeholder="Voer een titel in …"
            rules={{
              maxLength: {
                value: maxCharacters.title,
                message: 'Het maximum aantal tekens is bereikt',
              },
              required: 'Vul een titel in',
            }}
            testID="ConstructionWorkEditorCreateMessageTitle"
          />
          <TextInputField
            label="Wat is de tekst van je bericht?"
            maxCharacters={maxCharacters.body}
            name="body"
            numberOfLines={7}
            placeholder="Voer een tekst in …"
            rules={{
              maxLength: {
                value: maxCharacters.body,
                message: 'Het maximum aantal tekens is bereikt',
              },
              required: 'Vul een tekst in',
            }}
            testID="ConstructionWorkEditorCreateMessageBody"
          />
        </Column>
        <Column gutter="xs">
          <Row valign="baseline">
            <Title text="Foto toevoegen" />
          </Row>
          <Column gutter="md">
            <Paragraph>
              Je kunt een foto toevoegen bij dit bericht. Deze wordt liggend
              uitgesneden en komt bovenaan het bericht te staan. Wanneer je geen
              foto toevoegt dan gebruiken we een standaard afbeelding.
            </Paragraph>
            <Row align="start">
              <Button
                iconName="plus"
                label="Foto toevoegen"
                onPress={handleSubmit(pickImage())}
                testID="ConstructionWorkEditorCreateMessageAddImageButton"
                variant="secondary"
              />
            </Row>
            <Row align="start">
              <Button
                iconName="plus"
                label="Foto maken"
                onPress={handleSubmit(pickImage(true))}
                testID="ConstructionWorkEditorCreateMessageTakeImageButton"
                variant="secondary"
              />
            </Row>
          </Column>
        </Column>
      </Column>
    </FormProvider>
  )
}
