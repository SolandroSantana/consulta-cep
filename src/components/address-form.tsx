"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { toast } from "@/components/ui/use-toast"
import { skipToken, useQuery } from "@tanstack/react-query"
import { getAddress } from "@/data/api"
import { useState } from "react"
import { Copy } from "lucide-react"
import { SkeletonCard } from "./skeleton"



const FormSchema = z.object({
    cep: z.string().min(8, {
        message: "Insira 8 digitos para pesquisar o CEP!"
    }).max(8, { message: "Insira somente 8 digitos para pesquisar o CEP" })
})

export function AddressForm() {

    const [cep, setCep] = useState('')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { data, isLoading } = useQuery({
        queryKey: ['address', cep],
        queryFn: cep.length == 8 ? async () => await getAddress(cep) : skipToken,
    })


    if (data?.erro) {
        toast({
            variant: "destructive",
            title: "Endereço não encontrado.",
            description: "Não foi possível encontrar este endereço!"
        })
    }

    return (
        <>
            <Card className="lg:w-[350px] h-64">
                <CardHeader>
                    <CardTitle>Digite aqui o CEP</CardTitle>
                    <CardDescription>Pesquise qualquer endereço</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-6">
                            <FormField
                                control={form.control}
                                name="cep"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CEP</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                maxLength={8}
                                                max={8}
                                                {...field}
                                                onChange={(event: any) => {
                                                    if (event.target.value.length < 9) {
                                                        field.onChange(event.target.value);
                                                        if (event.target.value.length == 8) {
                                                            setCep(event.target.value);
                                                        }
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>

            
                <Card className='lg:w-[800px] pt-5'>
                    <CardContent>
                        {isLoading ? 
                            <SkeletonCard />
                        : 
                        <div className="grid lg:grid-cols-2 lg:w-full items-center gap-4">
                            <div className="flex flex-col">
                                <Label htmlFor="name">CEP</Label>
                                {data?.cep ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.cep}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.cep)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">CEP copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">Logradouro</Label>
                                {data?.logradouro ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.logradouro}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.logradouro)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">Logradouro copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">Complemento</Label>
                                {data?.complemento ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.complemento}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.complemento)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">Complemento copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">Bairro</Label>
                                {data?.bairro ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.bairro}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.bairro)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">Bairro copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">Localidade</Label>
                                {data?.localidade ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.localidade}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.localidade)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">Localidade copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">UF</Label>
                                {data?.uf ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.uf}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.uf)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">UF copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">IBGE</Label>
                                {data?.ibge ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.ibge}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.ibge)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">IBGE copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">GIA</Label>
                                {data?.gia ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.gia}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.gia)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">GIA copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">DDD</Label>
                                {data?.ddd ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.ddd}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.ddd)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">DDD copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="name">SIAFI</Label>
                                {data?.siafi ?
                                    <div className="flex gap-2 items-center">
                                        <h1>{data?.siafi}</h1>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(data?.siafi)
                                                    }}
                                                >
                                                    <Copy size={24} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm font-medium">SIAFI copiado para área de transferência!</p>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    :
                                    '-'
                                }
                            </div>
                        </div>
                        }
                    </CardContent>
                </Card>

        </>
    )
}
