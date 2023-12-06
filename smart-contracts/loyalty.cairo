
use starknet::ContractAddress;

#[starknet::interface]
trait loyalty<TContractState> {
    fn get_loyalty(self: @TContractState, account: ContractAddress) -> felt252;

    fn set_loyalty(
        ref self: TContractState, owner: ContractAddress, approved: felt252
    );
    fn remove_loyalty(
        ref self: TContractState, owner: ContractAddress, removed: felt252
    );
}

#[starknet::contract]
mod loyalty1 {
    use starknet::get_caller_address;
    use starknet::contract_address_const;
    use starknet::ContractAddress;
    use traits::Into;
    use zeroable::Zeroable;
    use traits::TryInto;
    use option::OptionTrait;

    #[storage]
    struct Storage {
        individual_milestone: LegacyMap::<ContractAddress, felt252>,
    }

    #[external(v0)]
    impl loyaltyImpl of super::loyalty<ContractState> {
        fn get_loyalty(self: @ContractState, account: ContractAddress) -> felt252 {
            self.individual_milestone.read(account)
        }
        fn set_loyalty(ref self: ContractState, owner: ContractAddress, approved: felt252) {
            let x = self.individual_milestone.read(owner);
            self.individual_milestone.write(owner, x + approved);
        }
        fn remove_loyalty(ref self: ContractState, owner: ContractAddress, removed: felt252){
            let x = self.individual_milestone.read(owner);
            self.individual_milestone.write(owner, x - removed);
        }
    }

}