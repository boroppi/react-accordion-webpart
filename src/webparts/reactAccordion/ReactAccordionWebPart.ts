import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import { 
  PropertyFieldColorPicker, 
  PropertyFieldColorPickerStyle 
} from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';


import * as strings from 'ReactAccordionWebPartStrings';
import ReactAccordion from './components/ReactAccordion';
import { IReactAccordionProps } from './components/IReactAccordionProps';

export interface IReactAccordionWebPartProps {
  headerBackgroundColor: string;
  headerTextColor: string;
  questioBackgroundColor: string;
  questionTextColor: string;
  AnswerBackgroundColor: string;
  AnswerTextColor: string;
  listName: string;
  choice: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  updateProperty: (value: string) => void;
}

export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactAccordionProps> = React.createElement(
      ReactAccordion,
      {
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        title: this.properties.title,
        displayMode: this.displayMode,
        maxItemsPerPage: this.properties.maxItemsPerPage,
        updateProperty: (value: string) => {
          this.properties.title = value;
        
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldColorPicker('headerBackgroundColor', {
                  label: 'Header Background Colour',
                  selectedColor: this.properties.headerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'headerBackgroundColorPicker'
                }),
                PropertyFieldColorPicker('headerTextColor', {
                  label: 'Header Text Colour',
                  selectedColor: this.properties.headerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'headerTextColorPicker'
                }),
                PropertyFieldColorPicker('questionBackgroundColor', {
                  label: 'Question Background Colour',
                  selectedColor: this.properties.questioBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'questionBackgroundColorPicker'
                }),
                PropertyFieldColorPicker('questionTextColor', {
                  label: 'Question Text Colour',
                  selectedColor: this.properties.questionTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'questionTextColorPicker'
                }),
                PropertyFieldColorPicker('answerBackgroundColor', {
                  label: 'Answer Background Colour',
                  selectedColor: this.properties.AnswerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'answerBackgroundColor'
                }),
                PropertyFieldColorPicker('answerTextColor', {
                  label: 'Question Background Colour',
                  selectedColor: this.properties.AnswerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'answerTextColorPicker'
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                }),                
                PropertyPaneSlider('maxItemsPerPage', {
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
