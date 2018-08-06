import {Component, ComponentFactoryResolver, ComponentRef, Injector, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DashboardWidget} from './dashboard-widget';

@Component({
  selector: 'app-dashboard-widget-loader',
  template: `<template #loadWidget></template>`,
})
export class DashboardWidgetLoaderComponent implements OnInit {

  @ViewChild('loadWidget', {read: ViewContainerRef}) container;
  constructor(private resolver: ComponentFactoryResolver) { }


  @Input() set widget(dashboardWidget: DashboardWidget) {
    if (!dashboardWidget) {
      return;
    }
    const inputProviders = Object.keys(dashboardWidget.input).map((inputName) => {
      return {
        provide: dashboardWidget.input[inputName].key,
        useValue: dashboardWidget.input[inputName].value,
        deps: []
      };
    });
    const injector = Injector.create(inputProviders, this.container.parentInjector);
    const factory = this.resolver.resolveComponentFactory(dashboardWidget.widget);
    const component = factory.create(injector);
    this.container.insert(component.hostView);
    // const widget = this.container.createComponent(factory);
  }

  ngOnInit() {
  }


}
