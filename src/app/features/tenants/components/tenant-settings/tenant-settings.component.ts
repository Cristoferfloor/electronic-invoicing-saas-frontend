import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenantService } from '../../../../core/services/tenant.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
    selector: 'app-tenant-settings',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CardComponent,
        ButtonComponent,
        AlertComponent
    ],
    templateUrl: './tenant-settings.component.html',
    styleUrls: ['./tenant-settings.component.scss']
})
export class TenantSettingsComponent implements OnInit {
    tenantForm: FormGroup;
    billingForm: FormGroup;
    loading = false;
    successMsg: string | null = null;
    errorMsg: string | null = null;
    tenantData: any = null;

    constructor(
        private fb: FormBuilder,
        private tenantService: TenantService
    ) {
        this.tenantForm = this.fb.group({
            commercialName: ['', [Validators.required]],
            legalName: ['', [Validators.required]],
            taxId: [{ value: '', disabled: true }],
            address: ['', [Validators.required]],
            phone: [''],
            email: ['', [Validators.required, Validators.email]]
        });

        this.billingForm = this.fb.group({
            establishment: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
            emissionPoint: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
            environment: ['TEST', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.loadTenantData();
    }

    loadTenantData(): void {
        this.loading = true;
        this.tenantService.getMyTenant().subscribe({
            next: (tenant) => {
                this.tenantData = tenant;
                this.tenantForm.patchValue({
                    commercialName: tenant.commercialName,
                    legalName: tenant.legalName,
                    taxId: tenant.taxId,
                    address: tenant.address,
                    phone: tenant.phone,
                    email: tenant.email
                });
                
                // ← CORREGIDO: Manejar billingConfiguration vs configuration
                const billingConfig = tenant.billingConfiguration || tenant.configuration;
                if (billingConfig) {
                    this.billingForm.patchValue({
                        establishment: billingConfig.establishment,
                        emissionPoint: billingConfig.emissionPoint,
                        environment: billingConfig.environment
                    });
                }
                this.loading = false;
            },
            error: (err) => {
                this.errorMsg = err.error?.message || 'Error al cargar datos de la empresa';
                this.loading = false;
            }
        });
    }

    saveGeneralData(): void {
        if (this.tenantForm.invalid) return;
        this.loading = true;
        this.tenantService.updateTenant(this.tenantForm.value).subscribe({
            next: () => {
                this.successMsg = 'Información general actualizada';
                this.loading = false;
                setTimeout(() => this.successMsg = null, 3000);
            },
            error: () => {
                this.errorMsg = 'Error al actualizar información';
                this.loading = false;
            }
        });
    }

    saveBillingConfig(): void {
        if (this.billingForm.invalid) return;
        this.loading = true;
        this.tenantService.updateBillingConfig(this.billingForm.value).subscribe({
            next: () => {
                this.successMsg = 'Configuración de facturación actualizada';
                this.loading = false;
                setTimeout(() => this.successMsg = null, 3000);
            },
            error: () => {
                this.errorMsg = 'Error al actualizar configuración';
                this.loading = false;
            }
        });
    }
}
