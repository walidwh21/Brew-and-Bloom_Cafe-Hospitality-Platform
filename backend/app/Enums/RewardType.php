<?php

namespace App\Enums;

enum RewardType: string
{
    case Earned = 'earned';
    case Redeemed = 'redeemed';
    case Bonus = 'bonus';
    case Adjustment = 'adjustment';
}
