import {it , expect,describe } from 'vitest';
import { MoneyFormat } from './MoneyFormat';
 
 describe ('testing moneyformat', ()=>{
    it('test moneyformat ' ,()=>{
    expect(MoneyFormat(1999)).toBe('$19.99')
})
it('test 2 decimal number', ()=>{
    expect(MoneyFormat(1090)).toBe('$10.90')
    expect(MoneyFormat(100)).toBe('$1.00')
})
 })
