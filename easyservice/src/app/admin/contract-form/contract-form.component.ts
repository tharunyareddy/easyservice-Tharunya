import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Contract } from 'src/app/model/contract';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
})
export class ContractFormComponent implements OnInit {
  contract: Contract;
  contracts: Contract[];
  errorMessage: string;
  constructor(
    private _route: Router,
    private _contractService: ContractorService
  ) {}

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts = () => {
    this._contractService.getAllContracts().subscribe(
      (contractsList) => {
        this.contracts = contractsList;
        console.log(contractsList);
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  };

  onAddContract = (contractForm: NgForm) => {
    this._contractService.addContract(contractForm.value).subscribe(
      (data: Contract) => {
        console.log(data);
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  };

  onClick() {
    this._route.navigate(['/home']);
  }
  onUpdateContract = (contractForm: NgForm) => {
    this._contractService.updateContract(contractForm.value).subscribe(
      (data: Contract) => {
        console.log(data);
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  };
  onDeleteContract = (contractId: number) => {
    this._contractService.deleteContract(contractId).subscribe(
      () => console.log('Deleted'),
      (error) => console.log(error),
      () => console.log('completed')
    );
    this.getAllContracts();
  };
}
