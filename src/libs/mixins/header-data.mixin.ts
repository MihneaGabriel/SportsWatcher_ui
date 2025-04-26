import { AfterViewInit, Directive, signal, TemplateRef, Type, ViewChild, WritableSignal } from "@angular/core";

export interface CanSetHeaderData {
  headerContent: WritableSignal<TemplateRef<any>|string | null>;
  headerTitle: WritableSignal<TemplateRef<any>|string | null>;
  headerContentTemplate?: TemplateRef<any>;
  headerTitleTemplate?: TemplateRef<any>;
  ngAfterViewInit(): void;
}

type CanSetHeaderDataConstructor = (new(...args: any[]) => CanSetHeaderData) & (abstract new(...args: any[]) => CanSetHeaderData);

export function mixinHeaderData<TBase extends Type<any>>(Base: TBase, addViewChildrenBindings = true): CanSetHeaderDataConstructor & typeof Base {
  // eslint-disable-next-line @angular-eslint/component-class-suffix
  @Directive()
  class Mixed extends Base implements AfterViewInit, CanSetHeaderData {
    @ViewChild('headerTitle') headerTitleTemplate?: TemplateRef<any>;
    headerTitle = signal<TemplateRef<any>|string | null>(null);
    
    @ViewChild('headerContent') headerContentTemplate?: TemplateRef<any>;
    headerContent = signal<TemplateRef<any>|string | null>(null);
    ngAfterViewInit() {
      super.ngAfterViewInit?.();
      this.headerTitle.set(this.headerTitleTemplate ?? null);
      this.headerContent.set(this.headerContentTemplate ?? null);
    }
  };

  return addViewChildrenBindings ? Mixed : class extends Base implements CanSetHeaderData {
    headerContent = signal<TemplateRef<any>|string | null>(null);
    headerTitle = signal<TemplateRef<any>|string | null>(null);
    ngAfterViewInit() {
      super.ngAfterViewInit?.();
    }
  }
}