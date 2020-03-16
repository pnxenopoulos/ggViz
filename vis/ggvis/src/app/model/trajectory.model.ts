
import { Position } from './position.model';

export class Trajectory {
    
    public trajectory: Position[] = [];

    constructor(){}

    getPosition(tick: number): Position{
        return this.trajectory[tick]
    }

    addPosition(position: Position): void{
        this.trajectory.push(position);
    }

    repeatLastPosition(): void{
        this.trajectory.push(this.trajectory[this.trajectory.length - 1])
    }

    getTrajectoryLength(): number{
        return this.trajectory.length;
    }

    getTrajectorySlice(initialPoint: number, endPoint: number): Position[]{

        return this.trajectory.slice(initialPoint, endPoint);

    }

    // this method adds initial stopped positions for a trajectory
    addInitialPosition(nTicks: number, position: Position): void{
        for(let i = 0; i < nTicks; i++){
            this.trajectory.push(position);
        }
    }

}  