step basic info

[title (vietnamese)]
[title (english)]
[Price (VND) (USD)]
[category ^] [sales type ^] if salesType = rent ? [Rental Period (value) (unit)]
[available until @]
[facingDirection ^]
[bedRoomCount ^]
[size (width) (height)]

step description in vietnamese
[description]

step description in english
[description]

step select main image

step carousel images

step query info

step address location

step visible select

step review??

step done??


Wizard
  wizardData

  onSubmit(basicInfoData) {
    wizardData.basicInfo = basicInfoData
    nextStep()
  }

  StepBasicInfo onSubmit={ onSubmit }