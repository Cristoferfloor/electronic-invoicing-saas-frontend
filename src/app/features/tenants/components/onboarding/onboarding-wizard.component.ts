import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TenantService } from '../../../../core/services/tenant.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
    selector: 'app-onboarding-wizard',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent],
    templateUrl: './onboarding-wizard.component.html',
    styleUrls: ['./onboarding-wizard.component.scss']
})
export class OnboardingWizardComponent implements OnInit {
    private fb = inject(FormBuilder);
    private tenantService = inject(TenantService);
    private router = inject(Router);

    currentStep = 1;
    totalSteps = 3;
    loading = false;

    billingForm: FormGroup;

    steps = [
        { title: 'Confirmar Datos de la Empresa', icon: '🏢' },
        { title: 'Configurar Facturación SRI', icon: '📋' },
        { title: '¡Bienvenido! Todo está listo', icon: '🎉' }
    ];

    tenantData: any = null;

    constructor() {
        this.billingForm = this.fb.group({
            establishment: ['001', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
            emissionPoint: ['001', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
            environment: ['TEST', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.tenantService.getMyTenant().subscribe({
            next: (tenant: any) => {
                this.tenantData = tenant;
                if (tenant.configuration) {
                    this.billingForm.patchValue(tenant.configuration);
                }
            }
        });
    }

    nextStep(): void {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }

    prevStep(): void {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    saveBillingConfig(): void {
        if (this.billingForm.invalid) return;
        this.loading = true;
        this.tenantService.updateBillingConfig(this.billingForm.value).subscribe({
            next: () => {
                this.loading = false;
                this.nextStep();
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}
